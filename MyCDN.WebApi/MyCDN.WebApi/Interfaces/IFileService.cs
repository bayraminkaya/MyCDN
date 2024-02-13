using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyCDN.WebApi.Entities;
namespace MyCDN.WebApi.Interfaces
{
    public interface IFileService
    {
        MyFile GetFileById(int fileId);
    }
}
