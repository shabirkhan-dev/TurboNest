'use client'

import { Box, MoonIcon, SunIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'

const DarkPattern = () => (
  <div
    className="absolute inset-0 w-full h-full -z-10"
    style={{
      background: `
            radial-gradient(black 15%, transparent 16%) 0 0,
            radial-gradient(black 15%, transparent 16%) 8px 8px,
            radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,
            radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px
            `,
      backgroundColor: '#282828',
      backgroundSize: '16px 16px',
    }}
  />
)
export default function Page() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="min-h-screen  transition-colors duration-300">
      <DarkPattern />
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4  transition-colors duration-300">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
          </div>
          <span className="font-semibold text-xl text-gray-900 dark:text-white">Prolib</span>
        </div>

        <div>H</div>

        <div className="flex items-center gap-4">
          <Button type="button">Sign in</Button>
          <Button onClick={toggleTheme} variant="ghost">
            {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative  px-6 pt-20 pb-32 max-w-7xl mx-auto">
        {/* Book Note */}
        <div className="absolute left-10 top-32 transform -rotate-6">
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 shadow-lg w-48 transition-colors duration-300">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
              Efficiently catalog, track, and manage your entire library collection with ease.
            </p>
          </div>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md w-12 h-12 flex items-center justify-center transition-colors duration-300">
            <div className="text-blue-500 dark:text-blue-400 w-6 h-6">📚</div>
          </div>
        </div>

        {/* Reminder Card */}
        <div className="absolute right-10 top-32">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg w-64 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">📅</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Upcoming Events</h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg transition-colors duration-300">
              <p className="font-medium text-gray-900 dark:text-white">Quarterly Inventory</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">All departments</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm text-blue-500 dark:text-blue-400">
                  Next Monday, 09:00-17:00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-12 h-12 mx-auto mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-center transition-colors duration-300">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full" />
                <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full" />
                <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-medium mb-2 text-gray-900 dark:text-white transition-colors duration-300">
              Organize, analyze, and optimize
              <br />
              <span className="text-gray-400 dark:text-gray-500">your library operations</span>
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300">
            Streamline your library management and enhance patron services.
          </p>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-full text-lg transition-colors duration-300">
            Schedule a demo
          </Button>
        </div>

        {/* Bottom Cards */}
        <div className="absolute bottom-0 left-10">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg w-64 transition-colors duration-300">
            <h3 className="font-medium mb-4 text-gray-900 dark:text-white">Today's Statistics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">New acquisitions</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">60%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <div className="h-full w-3/5 bg-blue-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Circulation rate</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">75%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <div className="h-full w-3/4 bg-green-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-10">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg transition-colors duration-300">
            <h3 className="font-medium mb-4 text-gray-900 dark:text-white">Integrated Systems</h3>
            <div className="flex gap-2">
              <Box />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
