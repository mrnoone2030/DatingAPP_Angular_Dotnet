using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int errorCode, string message = null, string details = null)
        {
            ErrorCode = errorCode;
            Message = message;
            Details = details;
        }

        public int ErrorCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}