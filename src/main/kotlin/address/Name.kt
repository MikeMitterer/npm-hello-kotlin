package example.address

/**
 *
 *
 * @since   26.10.18, 20:38
 */
class Name(val firstname: String,val lastname: String) {
    val fullname : String
        get() = "$firstname $lastname"
}
