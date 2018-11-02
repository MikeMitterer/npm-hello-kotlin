package example

import example.address.Name
import kotlin.browser.document

fun main(args: Array<String>) {
    val appElement = document.getElementById("app")
    val name = Name("Mike", "Mitterer6")

    println("Mike6")
    appElement?.textContent = "Servus Kotlin!!Q53 - Name: ${name.fullname}"
}
