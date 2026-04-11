import { groq } from 'next-sanity'

export const landingPageQuery = groq`
  *[_type == "landingPage"][0] {
    seoTitle,
    seoDescription,
    hero { heading, tagline },
    philosophy { heading, body },
    process[] {
      title,
      description,
      "imageUrl": image.asset->url
    },
    signatureDishes[]-> {
      _id,
      name,
      description,
      price,
      "imageUrl": image.asset->url,
      isSignature
    },
    atmosphere {
      subtitle,
      "imageUrl": image.asset->url
    },
    cta { heading, buttonText }
  }
`
