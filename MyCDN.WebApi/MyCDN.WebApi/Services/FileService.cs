using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyCDN.WebApi.Entities;
using MyCDN.WebApi.Interfaces;

namespace MyCDN.WebApi.Services
{
    public class FileService : IFileService
    {
        private readonly IFileRepository _fileRepository;
        private readonly IUserRepository _userRepository; // Burada tanımlandı

        public FileService(IFileRepository fileRepository, IUserRepository userRepository)
        {
            _fileRepository = fileRepository;
            _userRepository = userRepository; // Burada atanıyor
        }

        public MyFile GetFileById(int fileId)
        {
            return _fileRepository.GetFileById(fileId);
        }

        public IActionResult UploadFile(int userId, IFormFile file)
        {
            // Dosya boyutunu al
            int fileSize = (int)file.Length;

            // Kullanıcı kotasını kontrol et
            if (!CheckUserQuota(userId, fileSize))
            {
                return new BadRequestObjectResult("Kota aşımı nedeniyle dosya yüklenemedi.");
            }

            return new OkObjectResult("Dosya başarıyla yüklendi.");
        }

        private bool CheckUserQuota(int userId, int fileSize)
        {
            // Kullanıcının kota bilgilerini al
            var userQuotas = _userRepository.GetUserQuotas(userId);

            // Kullanıcı kotasını kontrol et
            return userQuotas != null && userQuotas.UsedSpace + fileSize <= userQuotas.TotalSpace;
        }
    }
}
