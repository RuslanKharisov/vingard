import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Вингард Автоматика — российский интегратор HMI/SCADA и АСУТП. Автоматизируем и цифровизируем промышленные производства, внедряем ПО и оборудование ведущих мировых и отечественных брендов.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: '«НПО «Вингард Автоматика»',
  title: 'Вингард Автоматика — интегратор HMI/SCADA и АСУТП',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
