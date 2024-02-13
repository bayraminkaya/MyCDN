using MyCDN.WebApi.Entities;
using MyCDN.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCDN.WebApi.Repositories
{
    // IEmailService.cs
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
    }

    // SmtpEmailService.cs
    public class SmtpEmailService : IEmailService
    {
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            // Burada e-posta gönderme işlemini gerçekleştirin.
            // Örneğin, SmtpClient kullanarak:
            // SmtpClient smtpClient = new SmtpClient("smtp.example.com");
            // await smtpClient.SendMailAsync("from@example.com", to, subject, body);
        }
    }

    // FileRepository.cs
    public class FileRepository : IFileRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService; // E-posta servisi enjekte edildi

        public FileRepository(ApplicationDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public MyFile GetFileById(int fileId)
        {
            // Dosya işlemleri...

            // E-posta gönderme örneği (örnek veri, gerçekleştirmeniz gereken servise göre uyarlanmalı)
            string to = "recipient@example.com";
            string subject = "Dosya Yükleme Bilgilendirmesi";
            string body = "Dosyanız başarıyla yüklendi.";

            // E-posta gönderme işlemi
            _emailService.SendEmailAsync(to, subject, body);

            return null;
        }

        public bool CheckUserQuota(int userId, int fileSize)
        {
            // Kullanıcının toplam kota ve kullanılan alanını al
            var userQuotas = _context.UserQuotas.FirstOrDefault(uq => uq.UserId == userId);

            if (userQuotas != null)
            {
                // Kullanıcının toplam kota ve kullanılan alanını kontrol et
                int totalSpace = userQuotas.TotalSpace;
                int usedSpace = userQuotas.UsedSpace + fileSize;

                if (usedSpace > totalSpace)
                {
                    // Kullanıcının kotası dolmuş, e-posta gönder
                    string to = "recipient@example.com"; // Burada tanımlanmış
                    string quotaExceededSubject = "Kota Aşımı Bilgilendirmesi";
                    string quotaExceededBody = "Kota aşımı nedeniyle dosya yüklemeniz başarısız oldu. Lütfen kota durumunu kontrol edin.";

                    _emailService.SendEmailAsync(to, quotaExceededSubject, quotaExceededBody);

                    return false; // Kullanıcı kotası aşıldı
                }
            }

            return true; // Kullanıcı kotası aşılmadı
        }
    }


}
