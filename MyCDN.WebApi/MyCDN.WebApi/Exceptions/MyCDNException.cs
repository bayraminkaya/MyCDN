using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCDN.WebApi.Exceptions
{
    public class MyCDNException : Exception
    {
        public MyCDNException() : base() { }
        public MyCDNException(string message) : base(message) { }
        public MyCDNException(string message, Exception innerException) : base(message, innerException) { }
    }
}
