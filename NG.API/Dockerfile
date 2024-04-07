#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY NG.API/NG.API.csproj NG.API/
COPY NG.Application/NG.Application.csproj NG.Application/
COPY NG.DataCore/NG.DataCore.csproj NG.DataCore/
COPY NG.Infrastructure/NG.Infrastructure.csproj NG.Infrastructure/


RUN dotnet restore NG.API/NG.API.csproj
RUN dotnet restore NG.Application/NG.Application.csproj
RUN dotnet restore NG.DataCore/NG.DataCore.csproj
RUN dotnet restore NG.Infrastructure/NG.Infrastructure.csproj

COPY . .
WORKDIR /src/NG.API
RUN dotnet build "./NG.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./NG.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NG.API.dll"]