﻿using Mailjet.Client.Resources;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NG.Application.DTOs.Auths;
using NG.Application.MediatoR.Accounts.Auth.Commands;

namespace NG.API.Controllers.AccountsControllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        [ProducesDefaultResponseType(typeof(AccessTokenDto))]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginDto)
        {
            var validationResult = new LoginRequestDtoValidator().Validate(loginDto);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            var result = await _mediator.Send(new LoginCommand(loginDto));
            return Ok(result);
        }

        [HttpPost("logout")]
        [ProducesDefaultResponseType()]
        public async Task<IActionResult> Logout()
        {
            await _mediator.Send(new LogoutCommand(User.Identity.Name));
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("refreshToken")]
        [ProducesDefaultResponseType(typeof(RefreshAccessTokenDto))]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestDto refreshToken)
        {
            var validationResult = new RefreshTokenRequestDtoValidator().Validate(refreshToken);

            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            // Get the current access token from the HttpContext
            var accessToken = await HttpContext.GetTokenAsync("Bearer", "access_token");

            return Ok(await _mediator.Send(new RefreshTokenCommand(accessToken, refreshToken.RefreshToken)));
        }
    }
}
