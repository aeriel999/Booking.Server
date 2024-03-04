using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Services;
using Booking.Domain.Users;
using ErrorOr;
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

	public async Task<ErrorOr<string>> GenerateJwtTokenAsync(User user)
	{
		var signingCredentials = new SigningCredentials(
			new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
			SecurityAlgorithms.HmacSha256);

		var claims = new[]
		{
			new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
			new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
			//new Claim(JwtRegisteredClaimNames.GivenName, user.Id.ToString()),
			//new Claim(JwtRegisteredClaimNames.FamilyName, user.Id.ToString()),

		};

		var securityToken = new JwtSecurityToken(
			issuer: _jwtSettings.Issuer,
			audience: _jwtSettings.Audience,
			expires: dateTimeProvider.UtcNow.AddMinutes(_jwtSettings.ExpireMinutes),
			claims: claims,
			signingCredentials: signingCredentials);

		return new JwtSecurityTokenHandler().WriteToken(securityToken);
	}
}
