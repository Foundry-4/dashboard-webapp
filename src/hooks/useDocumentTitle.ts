import { useEffect } from 'react'

interface UseDocumentTitleOptions {
  restoreOnUnmount?: boolean
  prefix?: string
  suffix?: string
}

export const useDocumentTitle = (
  title: string,
  options: UseDocumentTitleOptions = {}
) => {
  const { restoreOnUnmount = true, prefix, suffix } = options

  useEffect(() => {
    const previousTitle = document.title

    // Build the full title
    let fullTitle = title
    if (prefix) fullTitle = `${prefix} | ${fullTitle}`
    if (suffix) fullTitle = `${fullTitle} | ${suffix}`

    document.title = fullTitle

    // Restore the previous title when the component unmounts
    if (restoreOnUnmount) {
      return () => {
        document.title = previousTitle
      }
    }
  }, [title, prefix, suffix, restoreOnUnmount])
}
