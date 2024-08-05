"use client"
import { Loader } from "@/components/Loader";
import { axios_analytics } from "@/lib/axios";
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Activity } from "lucide-react"
import { JsonEditor } from 'json-edit-react'
import { useTheme } from "next-themes";
import fallback from './fallback.json';

type Log = {
  request: any,
  response: any,
  timestamp: string,
} | null;

export default function Component({ params }: { params: { pathname: string } }) {
  const [log, setLog] = useState<Log>(fallback);
  const { theme, setTheme } = useTheme();

  const decodedPathname = decodeURIComponent(params.pathname);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios_analytics.get(`/get-log-by-id?pathname=${decodedPathname}`);
  //     setLog(data);
  //   }

  //   fetchData();
  // }, [])

  if (!log) return (
    <Loader />
  )
  return (
    <div className="grid gap-6 lg:grid-cols-2 mb-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Request</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <JsonEditor
            data={log.request}
            restrictEdit={true}
            restrictDelete={true}
            restrictAdd={true}
            restrictTypeSelection={true}
            theme={
              theme === "dark"
                ? [
                  'githubDark',
                  {
                    container: {
                      backgroundColor: '#09090b'
                    }
                  },
                ] : [
                  'githubLight',
                  {
                    container: {
                      backgroundColor: '#ffffff'
                    }
                  },
                ]
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <JsonEditor
            data={log.response}
            restrictEdit={true}
            restrictDelete={true}
            restrictAdd={true}
            restrictTypeSelection={true}
            theme={
              theme === "dark"
                ? [
                  'githubDark',
                  {
                    container: {
                      backgroundColor: '#09090b'
                    }
                  },
                ] : [
                  'githubLight',
                  {
                    container: {
                      backgroundColor: '#ffffff'
                    }
                  },
                ]
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
