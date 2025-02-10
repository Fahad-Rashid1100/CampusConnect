import { NextResponse } from "next/server"

const PORTAL_API_URL = process.env.PORTAL_API_URL || "https://online.umt.edu.pk"
const LMS_API_URL = process.env.LMS_API_URL || "https://lms.umt.edu.pk"

export async function GET(req: Request) {
  try {
    // Check Portal login status
    const portalResponse = await fetch(`${PORTAL_API_URL}/api/check-login`, {
      headers: {
        Cookie: req.headers.get("Cookie") || "",
      },
    })

    // Check LMS login status
    const lmsResponse = await fetch(`${LMS_API_URL}/api/check-login`, {
      headers: {
        Cookie: req.headers.get("Cookie") || "",
      },
    })

    if (portalResponse.ok && lmsResponse.ok) {
      return NextResponse.json({ loggedIn: true, message: "Logged in to both Portal and LMS" })
    } else {
      return NextResponse.json(
        {
          loggedIn: false,
          portalLoggedIn: portalResponse.ok,
          lmsLoggedIn: lmsResponse.ok,
          message: "Not logged in to both systems",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ loggedIn: false, message: "Error checking login status" }, { status: 500 })
  }
}

