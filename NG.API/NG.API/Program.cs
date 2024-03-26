using Microsoft.OpenApi.Models;
using NG.API.Middlewares;
using NG.Infrastructure;

var app = CreateWebApplicationBuilder().Build();
app.UseMiddleware<RequestLoggingMiddleware>();
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Configure the application to use CORS
var allowedOrigins = app.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();
app.UseCors(builder =>
    builder.WithOrigins(allowedOrigins)
           .AllowAnyMethod()
           .AllowAnyHeader());


app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API V1");

    });
    app.InitializeDatabase();
}
app.Run();

WebApplicationBuilder CreateWebApplicationBuilder()
{
    var builder = WebApplication.CreateBuilder(args);
    Logging(builder);
    Services(builder);
    Configuration(builder);
    return builder;
}

void Configuration(WebApplicationBuilder builder)
{
    builder.Services.AddInfrastructureConfiguration(builder.Configuration);
    //builder.Services.AddApplicationInsightsTelemetry(options =>
    //{
    //    options.InstrumentationKey = builder.Configuration["APPINSIGHTS_INSTRUMENTATIONKEY"];
    //    options.EnableDependencyTrackingTelemetryModule = false;
    //    options.EnableRequestTrackingTelemetryModule = false;
    //    options.EnableDebugLogger = false;
    //    options.EnableHeartbeat = false;
    //    options.AddAutoCollectedMetricExtractor = false;

    //});
}

void Logging(WebApplicationBuilder builder)
{
    builder.Logging
    //.AddFilter<ApplicationInsightsLoggerProvider>("", LogLevel.Information)
    .ClearProviders()
    .AddConsole();
}

void Services(WebApplicationBuilder builder)
{
    //builder.Services.AddSingleton<TelemetryClient>();
    builder.Services.AddInfrastructureServices();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });

        // Configure JWT Bearer token authorization
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the Bearer scheme. Just enter Bearer then the token only, Example: Bearer accessToken",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    },
                    Scheme = "oauth2",
                    Name = "Bearer",
                    In = ParameterLocation.Header,

                },
                new List<string>()
            }
        });
    });
}
