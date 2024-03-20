﻿namespace NG.Application.Exceptions
{
    public class EmailServiceException : Exception
    {
        public EmailServiceException() : base()
        {

        }

        public EmailServiceException(string message) : base(message)
        {

        }

        public EmailServiceException(string message, Exception exp) : base(message, exp)
        {

        }
    }
}
