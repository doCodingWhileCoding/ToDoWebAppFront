import { useInfiniteQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

const InfinityScroll = ({ children, queryKey, fetchFunction }) => {
  const { isPending, isError, error, data, fetchNextPage } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam = 1 }) => fetchFunction(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage
    },
  })
  const [docs, setDocs] = useState([])
  const [totalDocs, setTotalDocs] = useState(0)
  useEffect(() => {
    if (data) {
      setTotalDocs(data.pages[0].totalDocs)
      setDocs(data.pages.flatMap((page) => page.docs))
    }
  }, [data])

  const lastDocRef = useRef(null)
  const handleObserver = async (entities) => {
    const target = entities[0]

    if (target.isIntersecting) {
      fetchNextPage()
    }
  }
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '300px',
      threshold: 1.0,
    })

    if (lastDocRef.current) {
      observer.observe(lastDocRef.current)
    }
    return () => {
      if (lastDocRef.current) {
        observer.unobserve(lastDocRef.current)
      }
    }
  }, [docs, lastDocRef])

  if (isPending) {
    return <div>Loading...</div>
  } else if (isError) {
    return <div>Error: {error.response.data}</div>
  }
  return (
    <div className="InfinityScroll w-full h-full overflow-y-scroll">
      {children(docs, totalDocs, lastDocRef, setDocs)}
    </div>
  )
}
InfinityScroll.propTypes = {
  LoadingComponent: PropTypes.elementType,
  children: PropTypes.func.isRequired,
  queryKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  fetchFunction: PropTypes.func,
}
export default InfinityScroll
