import React, { useEffect, useState } from 'react'

import meImg from '../assets/me.jpeg'
import { LinkedlnIcon } from '../svg/linkedin.tsx'
import { GithubIcon } from '../svg/github.tsx'
import Repo from '../types/repos.ts'

const techs = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'ReactJS',
  'React Hooks',
  'React Forms',
  'Styled Components',
  'TailwindCSS',
  'NodeJS',
  'Express',
  'PostgreSQL',
  'Git',
]

interface BlogPost {
  slug: string
  title: string
  date: string
  summary: string
  url: string
}

function Main() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    fetch('https://api.github.com/users/guhenf/repos')
      .then((res) => res.json())
      .then((data) => setRepos(data))
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/guhenf/guhenf/contents/_posts'
        )
        const files = await response.json()
        const mdFiles = files.filter((file: any) => file.name.endsWith('.md'))

        const postsPromises = mdFiles.map(async (file: any) => {
          const contentRes = await fetch(file.download_url)
          const text = await contentRes.text()

          const titleMatch = text.match(/title: "(.*?)"/)
          const dateMatch = text.match(/date: (.*?)\n/)
          const summaryMatch = text.match(/summary: "(.*?)"/)

          return {
            slug: file.name.replace('.md', ''),
            title: titleMatch ? titleMatch[1] : 'Sem título',
            date: dateMatch ? dateMatch[1] : '',
            summary: summaryMatch ? summaryMatch[1] : '',
            url: file.html_url,
          }
        })

        const postsData = await Promise.all(postsPromises)
        setPosts(
          postsData.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        )
      } catch (error) {
        console.error('Erro ao buscar posts:', error)
      }
    }

    fetchPosts()
  }, [])

  return (
    <main className="flex-grow">
      <section className="py-8 grid grid-cols-2 w-fit ">
        <img
          src={meImg}
          className="max-w-32 rounded-full row-span-2 mr-6 ring-4 ring-slate-300"
        />
        <p className="text-lg text-right">guhenf@gmail.com</p>
        <div className="flex gap-4">
          <a target="_blank" href="https://www.linkedin.com/in/guhenf/">
            <LinkedlnIcon />
          </a>
          <a target="_blank" href="https://github.com/guhenf">
            <GithubIcon />
          </a>
        </div>
      </section>

      <section className="leading-relaxed my-6">
        <p>
          Iniciei meus estudos em Desenvolvimento Web em busca de uma
          recolocação no mercado de trabalho. Desde jovem, tive contato com
          computadores e internet. Antes dessa jornada, trabalhei por mais de 3
          anos na cozinha e por 1 ano e 7 meses com química laboratorial na
          Hyundai Motor Brasil. Sigo empresas que se preocupam com o nosso mundo
          e com as pessoas, sendo sustentáveis, inclusivas e que, por meio da
          Tecnologia e da Educação, buscam transformar o nosso mundo.
        </p>
        <p className="my-2">
          Em busca de uma carreira mais impactante para o futuro, estou em
          transição de carreira para a área de Desenvolvimento de Sistemas. Para
          firmar essa mudança, estou me graduando em Análise e Desenvolvimento
          de Sistemas pela Faculdade Estácio.
        </p>
        <p>
          Os estudoss me possibilitaram realizar alguns trabalhos. Dentre eles,
          destaco a criação de algumas Landing Pages, ajustes em sites e
          interfaces front-end em projetos de terceiros. Na realização desses
          trabalhos, utilizei e adquiri mais conhecimento sobre as seguintes
          tecnologias:
        </p>

        <ul className="grid grid-rows-5 grid-flow-col list-disc px-6">
          {techs.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </section>

      <section className="my-10 border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Últimos Posts</h2>

        {posts.length === 0 && (
          <p className="text-gray-500">Carregando publicações...</p>
        )}

        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border p-4 rounded hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-blue-600">
                  <a href={post.url} target="_blank" rel="noreferrer">
                    {post.title}
                  </a>
                </h3>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <p className="text-gray-700">{post.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Main
