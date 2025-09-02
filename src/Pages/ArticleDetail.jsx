import React from 'react';
import { useParams } from 'react-router-dom';
import articles from '../../public/data.json';
import { Link } from 'react-router-dom';

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === parseInt(id));
  const currentId = parseInt(id); // ubah ke number kalau articles.id number

  if (!article) {
    return <p>Artikel tidak ditemukan</p>;
  }

  return (
    <div className='pt-28 bg-white'>
      <div className='bg-[#f2f6ff] px-20 py-20 text-center'>
        <h1 className='text-[40px] font-bold text-[#16294A] relative z-20'>{article.title}</h1>
      </div>

      <div className='lg:px-20 px-10 py-20 flex flex-col gap-4 relative z-20'>

        <div className='flex gap-18'>
          <div className='flex-shrink-0'>
            <img className='w-170 object-cover rounded-2xl' src={article.img} alt="" />
          </div>

          <div className='flex flex-col gap-3'>
            <div>
              <h2 className='font-semibold text-[30px] text-[#16294A] mb-2'>Search</h2>
              {/* <input type="text" placeholder="Search" className='border border-gray-300 rounded-xs py-2 px-4 w-full' /> */}
            </div>

            <div>

              {/* Tampilkan list artikel kecuali yg sedang dibuka */}
              {articles
                .filter((a) => a.id !== currentId) // exclude artikel yg sedang dibuka
                .map((a) => (
                  <Link key={a.id} to={`/article/${a.id}`}>
                    <p className="mt-2 text-gray-700 hover:underline">{a.title}</p>
                  </Link>
                ))}
            </div>

          </div>

        </div>
        <p className='font-normal text-[18px] text-gray-500'>{article.date}</p>
        <h4 className='font-bold text-[40px] leading-10'>{article.title}</h4>
        <p className='font-light text-[18px] mt-2 w-full'>{article.content}</p>

      </div>

    </div>
  )
}
