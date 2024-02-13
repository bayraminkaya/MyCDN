// EmailService.cs
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using MyCDN.WebApi.Entities;
using MyCDN.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using MyCDN.WebApi.Repositories;


namespace MyCDN.WebApi.Services
{
    public class EmailService : IEmailService
    {
        private readonly SmtpClient _smtpClient;

        public EmailService(string smtpServer, int smtpPort, string smtpUsername, string smtpPassword)
        {
            _smtpClient = new SmtpClient(smtpServer, smtpPort)
            {
                Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                EnableSsl = true
            };
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            MailMessage mailMessage = new MailMessage
            {
                From = new MailAddress("your-email@example.com"), // E-posta gönderen adres
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            mailMessage.To.Add(to);

            await _smtpClient.SendMailAsync(mailMessage);
        }
    }
}
