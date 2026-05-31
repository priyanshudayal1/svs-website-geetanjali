import { useEffect, useMemo, useState } from 'react'
import {
  fallbackAllMenuItems,
  fetchMenuFeed,
  flattenCategories,
  normalizeFeed,
  setMenuCookies,
} from '../data/menuFeed'
import { menuCategories as fallbackMenuCategories } from '../data/menuData'

let cachedMenu = null
let pendingRequest = null

function loadMenu() {
  if (cachedMenu) {
    return Promise.resolve(cachedMenu)
  }

  if (!pendingRequest) {
    pendingRequest = setMenuCookies()
      .catch(() => null)
      .then(() => fetchMenuFeed())
      .then((feed) => {
        cachedMenu = normalizeFeed(feed)
        return cachedMenu
      })
      .finally(() => {
        pendingRequest = null
      })
  }

  return pendingRequest
}

export function useMenuFeed() {
  const [categories, setCategories] = useState(cachedMenu || fallbackMenuCategories)
  const [status, setStatus] = useState(cachedMenu ? 'ready' : 'loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    loadMenu()
      .then((nextCategories) => {
        if (!active) {
          return
        }

        setCategories(nextCategories)
        setStatus('ready')
      })
      .catch((nextError) => {
        if (!active) {
          return
        }

        setError(nextError)
        setStatus('error')
      })

    return () => {
      active = false
    }
  }, [])

  const allItems = useMemo(() => {
    if (!categories.length) {
      return fallbackAllMenuItems
    }

    return flattenCategories(categories)
  }, [categories])

  return {
    allItems,
    categories,
    error,
    isLoading: status === 'loading',
    status,
  }
}
