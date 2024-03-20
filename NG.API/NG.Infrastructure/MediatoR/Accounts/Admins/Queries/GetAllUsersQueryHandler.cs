using AutoMapper;
using MediatR;
using NG.Application.DTOs.Admins;
using NG.Application.MediatoR.Accounts.Admins.Queries;
using NG.Application.MediatoR.Accounts.Admins.Repos;
using NG.Infrastructure.MediatoR.Accounts.Services;

namespace NG.Infrastructure.MediatoR.Accounts.Admins.Queries
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, List<UserFullInfoDto>>
    {
        private readonly IAccountService _accountService;
        private readonly IAdminQueriesRepo _adminQueriesRepo;
        private readonly IMapper _mapper;
        public GetAllUsersQueryHandler(IAccountService accountService, IAdminQueriesRepo adminQueriesRepo, IMapper mapper)
        {
            _accountService = accountService;
            _adminQueriesRepo = adminQueriesRepo;
            _mapper = mapper;
        }

        public async Task<List<UserFullInfoDto>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var hasPermision = await _accountService.CheckPermissionsIsAdminOrSuperAsync(request.RequestedBy);
                if (!hasPermision)
                    throw new UnauthorizedAccessException();

                else
                {
                    var listOfUserWithRoles = await _adminQueriesRepo.GetAllApplicationUsersWithRolesAsync();
                    return _mapper.Map<List<UserFullInfoDto>>(listOfUserWithRoles);
                }

                throw new NotImplementedException();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
