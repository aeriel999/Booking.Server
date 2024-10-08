﻿using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Common;
using Booking.Domain.Users;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Booking.Infrastructure.Authentification;

public class JwtTokenGenerator(IOptions<JwtSettings> jwtOptions, IDateTimeProvider dateTimeProvider)
		: IJwtTokenGenerator
{
	public readonly JwtSettings _jwtSettings = jwtOptions.Value;

	public async Task<string> GenerateJwtTokenAsync(User user, string role)
	{
		var signingCredentials = new SigningCredentials(
			new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
			SecurityAlgorithms.HmacSha256);

		var claims = new[]
		{
			new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
			new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
			new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName ?? ""),
			new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName ?? ""),
			new Claim(JwtRegisteredClaimNames.Email, user.Email!),
			new Claim("EmailConfirm", user.EmailConfirmed.ToString()),
			new Claim(ClaimTypes.MobilePhone, user.PhoneNumber ?? ""),
			new Claim("Avatar", user.Avatar ?? ""),
			new Claim("ProfileHeaderImage", user.ProfileHeaderImage ?? ""),
			new Claim(ClaimTypes.Role, role),
			new Claim("Rating", user.Rating.ToString()!),
		};

		var securityToken = new JwtSecurityToken(
			issuer: _jwtSettings.Issuer,
			audience: _jwtSettings.Audience,
			expires: dateTimeProvider.UtcNow.AddMinutes(_jwtSettings.ExpireMinutes),
			claims: claims,
			signingCredentials: signingCredentials);

		return await Task.FromResult(new JwtSecurityTokenHandler().WriteToken(securityToken));
	}
}
