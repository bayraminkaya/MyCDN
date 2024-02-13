using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCDN.WebApi.WebApi.Filters
{
    public class AuthorizationFilter : IAuthorizationFilter
    {
        private readonly ILogger<AuthorizationFilter> _logger;

        public AuthorizationFilter(ILogger<AuthorizationFilter> logger)
        {
            _logger = logger;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            
            _logger.LogInformation("AuthorizationFilter is executed");
        }
    }
}
