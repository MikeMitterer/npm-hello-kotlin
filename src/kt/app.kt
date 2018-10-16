package example

import kotlin.browser.*

class Name(firstname: String, lastname: String)

fun main(args: Array<String>) {
    val appElement = document.getElementById("app")

    println("Mike3")
    appElement?.textContent = "Servus Kotlin!!Q21"
}
