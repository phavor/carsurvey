import { IResponse, IValidate } from "../types/type"

export const validateResponse = (
  state: IResponse,
  name: string
): IValidate | void => {
  if (name === "age") {
    if (!!state.age && Number(state.age)) {
      return {
        canProceed: Number(state.age) >= 18,
        hasBonus: Number(state.age) >= 18 && Number(state.age) <= 25,
      }
    } else {
      return {
        error: "Please provide your age to continue",
      }
    }
  }

  if (name === "gender") {
    return state.gender === "male" ||
      state.gender === "female" ||
      state.gender === "others"
      ? {
          canProceed: true,
        }
      : {
          error: "Please provide your gender to continue",
        }
  }

  if (name === "licensed") {
    if (!!state.licensed) {
      return {
        canProceed: state.licensed.toLowerCase().includes("yes"),
      }
    } else {
      return { error: "Provide a valid answer" }
    }
  }

  if (name === "beginner") {
    if (!!state.beginner) {
      return {
        canProceed: state.beginner.toLowerCase().includes("no"),
      }
    } else {
      return { error: "Provide a valid answer" }
    }
  }

  if (name === "drivetrain") {
    return !!state.drivetrain
      ? { canProceed: true }
      : { error: "Provide a valid answer" }
  }

  if (name === "emission") {
    return !!state.emission
      ? { canProceed: true }
      : { error: "Provide a valid answer" }
  }

  if (name === "carSize") {
    if (!!state.carSize && Number(state.carSize)) {
      return {
        canProceed: true,
      }
    } else {
      return {
        error: "Please enter number of cars to continue",
      }
    }
  }

  if (name === "brand-model") {
    interface IDict {
      [x: string]: any
    }
    let carList: IDict[] = []
    let count = 0
    let stateCopy: IDict = { ...state }

    // Get filter keys
    const filters = Object.keys(state).filter(
      (item) => item.includes("brand") || item.includes("model")
    )

    // Format CarList
    while (count <= +state.carSize) {
      carList.push({
        brand: stateCopy[filters[count]],
        model: stateCopy[filters[count + 1]],
      })
      count = count + 2
    }

    // Format Car list models
    carList.map((item) => {
      // if (item)
    })

    // return data
    const payload = {
      age: state.age,
      gender: state.gender,
      carSize: state.carSize,
      licensed: state.licensed,
      beginner: state.beginner,
      emission: state.emission,
      drivetrain: state.drivetrain,
      carList,
    }

    return {
      canProceed: true,
      payload,
    }
  }
}