"use client"

import * as React from "react"
import { Link } from "react-router-dom"
import Navbar from "../NavBar"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Users, ChartBar, Settings } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu"

// Components options for selection
const components = [
  {
    title: "Fitness Score",
    href: "/components/fitness-score",
    description: "Track and analyze your fitness score for better performance.",
  },
  {
    title: "Calorie Calculator",
    href: "/components/calorie-calculator",
    description: "Calculate daily calorie intake and track your diet.",
  },
]

export default function Home({ user, setUser }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} setUser={setUser} />

      {/* Navigation Menu */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <NavigationMenu>
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Home</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
                <li>
  <NavigationMenuLink asChild>
    <Link
      to="/components/fitness-score"
      className="flex flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none 
                 transition-all duration-200 hover:shadow-lg hover:scale-105 hover:bg-gray-50"
    >
      <div className="mb-2 text-lg font-medium">Fitness Score</div>
      <p className="text-muted-foreground text-sm leading-tight">
        Track and analyze your fitness score.
      </p>
    </Link>
  </NavigationMenuLink>
</li>

<li>
  <NavigationMenuLink asChild>
    <Link
      to="/components/calorie-calculator"
      className="flex flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none 
                 transition-all duration-200 hover:shadow-lg hover:scale-105 hover:bg-gray-50"
    >
      <div className="mb-2 text-lg font-medium">Calorie Calculator</div>
      <p className="text-muted-foreground text-sm leading-tight">
        Calculate daily calories intake and track your diet.
      </p>
    </Link>
  </NavigationMenuLink>
</li>

                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 sm:w-[300px] md:w-[400px] lg:w-[500px] md:grid-cols-1 lg:grid-cols-2">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      to={component.href}
                      title={component.title}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/docs">Docs</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Hero Section */}
      <div className="text-center py-20 px-4 bg-gradient-to-r from-green-100 to-green-200">
        <h1 className="text-5xl font-bold text-gray-800">
          Welcome, {user ? user.firstname : "Guest"}!
        </h1>
        <p className="mt-4 text-gray-600 text-lg md:text-xl max-w-xl mx-auto">
          This is your personalized dashboard. Explore your profile and select a component to get started.
        </p>
        <Button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full hover:scale-105 transition-transform duration-200">
          Explore Now
        </Button>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all bg-white rounded">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Fitness Score</h2>
            <div className="p-2 rounded-full bg-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-4">Track and analyze your fitness score efficiently.</p>
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Open Fitness Score
          </Button>
        </Card>

        <Card className="p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all bg-white rounded">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Calorie Calculator</h2>
            <div className="p-2 rounded-full bg-green-100">
              <ChartBar className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-4">Calculate your daily calorie intake easily.</p>
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
            Open Calorie Calculator
          </Button>
        </Card>
      </div>
    </div>
  )
}

// Helper component for menu items
function ListItem({ title, children, to, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={to}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
