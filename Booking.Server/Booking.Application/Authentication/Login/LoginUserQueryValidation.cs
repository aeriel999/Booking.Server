﻿using FluentValidation;

namespace Booking.Application.Authentication.Login;

public class LoginUserQueryValidation : AbstractValidator<LoginUserQuery>
{
	public LoginUserQueryValidation()
	{
		RuleFor(r => r.Email).NotEmpty().WithMessage("Field must not be empty")
			.EmailAddress().WithMessage("Wrong email format")
			.MaximumLength(24).MinimumLength(8);

	 
		RuleFor(r => r.Password).NotEmpty().WithMessage("Field must not be empty")
			.MaximumLength(24).MinimumLength(8)
			.Matches("[A-Z]").WithMessage("Password must contain one or more capital letters.")
			.Matches("[a-z]").WithMessage("Password must contain one or more lowercase letters.")
			.Matches(@"\d").WithMessage("Password must contain one or more digits.")
			.Matches(@"[][""!@$%^&*(){}:;<>,.?/+_=|'~\\-]").WithMessage("Password must contain one or more special characters.")
			.Matches("^[^£# “”]*$").WithMessage("Password must not contain the following characters £ # “” or spaces.");
	}
}