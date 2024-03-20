using Mailjet.Client;
using Microsoft.Extensions.DependencyInjection;
using NG.Infrastructure.CommonServices.EndPointsRegisterServices;

namespace NG.Infrastructure.EmailServices
{
    public interface IMailjetClientService
    {
        Task<bool> SendEmailAsync(string apiKey, string apiSecret, MailjetRequest request);
    }
    [AutoRegister(ServiceLifetime.Singleton)]
    public class MailjetClientService : IMailjetClientService
    {
        public async Task<bool> SendEmailAsync(string apiKey, string apiSecret, MailjetRequest request)
        {
            var client = new MailjetClient(apiKey, apiSecret);
            var response = await client.PostAsync(request);
            return response.IsSuccessStatusCode;
        }
    }
}
