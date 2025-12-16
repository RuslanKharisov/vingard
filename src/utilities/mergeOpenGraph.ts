import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'ООО «НПО «Вингард Автоматика» (ИНН 5906152996) — российская ИТ-компания, которая выполняет работы по комплексной автоматизации и цифровизации промышленных производств. Мы разрабатываем и внедряем программное обеспечение для автоматизации и визуализации производственных процессов. Имеем большой опыт работы с программным обеспечением и оборудованием ведущих мировых и отечественных производителей. Работаем на действующих производствах, соблюдая российские и международные стандарты безопасности. …',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: '«НПО «Вингард Автоматика»',
  title: 'ООО «НПО «Вингард Автоматика»',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
