using MediatR;
using NG.Application.DTOs.Admins;

namespace NG.Application.MediatoR.Accounts.Admins.Queries
{
    public class GetAllUsersQuery : IRequest<List<UserFullInfoDto>>
    {
        public GetAllUsersQuery(string requestedBy)
        {
            RequestedBy = requestedBy;
        }

        public string RequestedBy { get; set; }
    }
}
