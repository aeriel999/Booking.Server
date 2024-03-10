using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Common.Validation;

public class AtributeExtensions
{
	public class CompareWithDisplayName : CompareAttribute
	{
		public CompareWithDisplayName(string otherProperty) : base(otherProperty)
		{
		}
	}
}
