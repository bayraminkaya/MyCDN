using MyCDN.WebApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace MyCDN.WebApi.Interfaces
{
    public interface IFileRepository
    {
        MyFile GetFileById(int fileId);
        
    }
}
