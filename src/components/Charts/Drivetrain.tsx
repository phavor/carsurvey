import { Doughnut } from "react-chartjs-2"
import { Chart, ArcElement } from "chart.js"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
} from "@mui/material"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import React from "react"
import { TDBPayload } from "../../types/type"
import { getSurveys } from "../../utils/database"
import { isNan } from "../../utils/helper"

Chart.register(ArcElement)

interface IProps {
  [x: string]: any
}
interface IChart {
  totalFWD: string | number
  totalRWD: string | number
  totalDontKnow: string | number
}

const Drivetrain = (props: IProps) => {
  const [survey, setSurvey] = React.useState<TDBPayload[]>([])
  const theme = useTheme()

  React.useEffect(() => {
    const init = () => {
      setSurvey(getSurveys())
    }

    init()
    window.addEventListener("storage", init)

    return () => {
      window.removeEventListener("storage", init)
    }
  }, [])

  const chartData = React.useMemo(() => {
    let totalFWD = 0
    let totalRWD = 0
    let totalDontKnow = 0
    let totalTargeted = survey.filter((item) =>
      item.beginner?.toLowerCase().includes("no")
    ).length
    let percentages: IChart = {
      totalFWD: 0,
      totalRWD: 0,
      totalDontKnow: 0,
    }

    survey.forEach((item) => {
      if (
        item.beginner?.toLowerCase().includes("no") &&
        item.drivetrain?.toLowerCase().includes("fwd")
      ) {
        totalFWD += 1
      } else if (
        item.beginner?.toLowerCase().includes("no") &&
        item.drivetrain?.toLowerCase().includes("rwd")
      ) {
        totalRWD += 1
      } else if (
        item.beginner?.toLowerCase().includes("no") &&
        item.drivetrain?.toLowerCase().includes("know")
      ) {
        totalDontKnow += 1
      }
    })

    percentages.totalFWD = isNan(((totalFWD / totalTargeted) * 100).toFixed(0))
    percentages.totalRWD = isNan(((totalRWD / totalTargeted) * 100).toFixed(0))
    percentages.totalDontKnow = isNan(
      ((totalDontKnow / totalTargeted) * 100).toFixed(0)
    )

    return {
      dataList: [totalFWD, totalRWD, totalDontKnow],
      percentages,
    }
  }, [survey])

  const data = {
    datasets: [
      {
        data: chartData.dataList,
        backgroundColor: ["#2ed7ff", "#2466f3", "#fc9d45"],
        borderWidth: 5,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: ["FWD", "RWD", "I don't know"],
  }

  const options = {
    plugins: {
      animation: true,
      cutoutPercentage: 80,
      layout: { padding: 0 },
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      responsive: true,
      tooltips: {
        backgroundColor: theme.palette.background.paper,
        bodyFontColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        enabled: true,
        footerFontColor: theme.palette.text.secondary,
        intersect: false,
        mode: "index",
        titleFontColor: theme.palette.text.primary,
      },
    },
  }

  const respondentGroups = [
    {
      title: "FWD",
      value: chartData.percentages.totalFWD,
      icon: DirectionsCarIcon,
      color: "#2ed7ff",
    },
    {
      title: "RWD",
      value: chartData.percentages.totalRWD,
      icon: DirectionsBusIcon,
      color: "#2466f3",
    },
    {
      title: "I don't Know",
      value: chartData.percentages.totalDontKnow,
      icon: QuestionMarkIcon,
      color: "#fc9d45",
    },
  ]

  return (
    <Card {...props}>
      <CardHeader title="Drivetrain" sx={{ color: "#0a6d94" }} />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: "400px",
            position: "relative",
          }}
          className="chart-wrapper"
        >
          {!!survey.length ? (
            <Doughnut className="chart" data={data} options={options} />
          ) : (
            <Box
              sx={{
                height: "350px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                component="p"
                textAlign="center"
                sx={{ color: "#999" }}
              >
                No available data
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
          className="legend"
        >
          {respondentGroups.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h4">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Drivetrain
