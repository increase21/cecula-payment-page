document.addEventListener("DOMContentLoaded", function() {
    const testAlphabet = /^[a-z]+$/i
    const testAlphaNum = /^[\w\d\s]+$/
    const testOthers = /^[\w\s\-\_\&\.]+$/
    const testEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // function to select DOM
    function getDOM(element) {
        var prop = null
        if (element) {
            prop = document.querySelectorAll(element)
            if (prop.length) {
                for (t of prop) {
                    t.clickk = (child, callBack) => {
                        if (typeof child === 'function') {
                            prop.forEach(each => {
                                each.onclick = (e) => {
                                    child(e)
                                }
                            })
                        } else {
                            if (typeof callBack === 'function') {
                                if (child) {
                                    document.querySelector(element).addEventListener("click", (e) => {
                                        var a = document.querySelectorAll(child)
                                        a.forEach(each => {
                                            if (e.target === each) {
                                                callBack(e)
                                            }
                                        })
                                    })
                                } else {
                                    throw new Error("Can not add click event of undefined")
                                }
                            } else {
                                throw new Error("Callback is not type of a function")
                            }
                        }
                    }
                    return typeof t === 'object' ? t : prop[0]
                }
            }
        }
    }
    // function to switch methods based on the current page loaded
    function runMethod() {
        var getPage = getDOM("page").getAttribute("title")
        switch (getPage) {
            case "select_bundle":
                selectBundle()
                break;
            case "personal":
                personalInfo()
                break
            default:
                return;
        }
    }

    // function to execute on select bundle page
    const selectBundle = () => {
            var smsQunty = getDOM("#sms_qunty")
            var smsCost = getDOM("#sms_cost")
            var bundleName = getDOM("#bundle_name")
            var bundleCost = getDOM("#unit_cost")

            function showBundleDetails(amout) {
                if (!amout || amout < 200 || isNaN(amout)) {
                    bundleCost.textContent = ''
                    bundleName.textContent = ''
                    return
                }
                if (amout >= 50000) {
                    bundleCost.textContent = '1.85'
                    bundleName.textContent = 'Premium'
                } else if (amout >= 10000) {
                    bundleCost.textContent = '2.00'
                    bundleName.textContent = 'Professional'
                } else if (amout >= 1000) {
                    bundleCost.textContent = '2.20'
                    bundleName.textContent = 'Standard'
                } else {
                    bundleCost.textContent = '3.50'
                    bundleName.textContent = 'Small Group'
                }
            }
            // when the sms Quantity input is
            getDOM("#sms_qunty").onkeyup = (e) => {
                    var unit = e.target.value
                    if (isNaN(e.key)) {
                        var value = e.target.value.match(/\d/g)
                        if (value === null) {
                            e.target.value = ''
                        } else {
                            e.target.value = value.join("")
                            unit = value.join("")
                        }
                    }
                    //    calculate the price
                    if (/^[\d]+$/.test(unit)) {
                        var price = 0
                        if (unit < 200) {
                            price = 'Minimum amount is N200'
                        } else if (unit >= 50000) {
                            price = 1.50 * unit
                        } else if (unit >= 10000) {
                            price = 2.00 * unit
                        } else if (unit >= 1000) {
                            price = 2.20 * unit
                        } else {
                            price = 3.50 * unit
                        }
                        // round up the amount
                        if (!isNaN(price)) {
                            smsCost.value = Math.ceil(price)
                        } else {
                            smsCost.value = price
                        }
                    }
                    showBundleDetails(unit)
                }
                // when the sms Quantity input is
            getDOM("#sms_cost").onkeyup = (e) => {
                    var unit = e.target.value
                    if (isNaN(e.key)) {
                        var value = e.target.value.match(/\d/g)
                        if (value === null) {
                            e.target.value = ''
                        } else {
                            e.target.value = value.join("")
                            unit = value.join("")
                        }
                    }
                    //    calculate the price
                    if (/^[\d]+$/.test(unit)) {
                        var smsUnit = 0
                        if (unit >= 50000) {
                            smsUnit = unit / 1.50
                        } else if (unit >= 10000) {
                            smsUnit = unit / 2.00
                        } else if (unit >= 1000) {
                            smsUnit = unit / 2.20
                        } else if (unit >= 700) {
                            smsUnit = unit / 3.50
                        } else {
                            smsUnit = 0
                        }
                        // round up the amount
                        if (!isNaN(smsUnit)) {
                            smsQunty.value = Math.round(smsUnit)
                        } else {
                            smsQunty.value = smsUnit
                        }
                    }
                    showBundleDetails(smsUnit)
                }
                // when the continue btn is clicked
            getDOM("#submit_btn").clickk(() => {
                var smsQunty = getDOM("#sms_qunty").value
                var smsCost = getDOM("#sms_cost").value
                if (smsQunty === '' || isNaN(smsCost) || smsQunty < 1) {
                    getDOM(".response").textContent = "Please select a bundle"
                    return
                }
                location.href = "./personal.html"
            })

        }
        // function to execute on personal Information page
    const personalInfo = () => {
        var resP = getDOM(".p-response")
        var resC = getDOM(".c-response")
            // when the submit btn is clicked
        getDOM("#submit_btn").clickk(() => {
            var gender = getDOM("#gender_name").value
            var givenName = getDOM("#given_name").value
            var familyName = getDOM("#family_name").value
            var company = getDOM("#company").value
            var email = getDOM("#email").value
            var addressOne = getDOM("#address_one").value
            var addressTwo = getDOM("#address_two").value
            var city = getDOM("#city").value
            var state = getDOM("#state").value
            var country = getDOM("#country").value
            var mobile = getDOM("#mobile").value
            if (gender === "") {
                resP.textContent = "Gender is required"
                window.scrollTo({ top: 400, behavior: "smooth" })
                return
            }
            if (givenName === "") {
                resP.textContent = "Given name is required"
                window.scrollTo({ top: 400, behavior: "smooth" })
                return
            }
            if (!testAlphabet.test(givenName.trim())) {
                resP.textContent = "Invalid given name"
                window.scrollTo({ top: 400, behavior: "smooth" })
                return
            }
            if (familyName === "") {
                resP.textContent = "family name is required"
                window.scrollTo({ top: 400, behavior: "smooth" })
                return
            }
            if (!testAlphabet.test(familyName.trim())) {
                resP.textContent = "Invalid family name"
                window.scrollTo({ top: 400, behavior: "smooth" })
                return
            }
            if (company === "") {
                resP.textContent = "Company is required"
                window.scrollTo({ top: 400, behavior: "smooth" })
                return
            }
            if (!testOthers.test(company.trim())) {
                resP.textContent = "Invalid company name"
                window.scrollTo({ top: 400, behavior: "smooth" })
                return
            }
            resP.textContent = ""
            if (email === "") {
                resC.textContent = "Email is required"
                window.scrollTo({ top: 700, behavior: "smooth" })
                return
            }
            if (!testEmail.test(email)) {
                resC.textContent = "Invalid email"
                window.scrollTo({ top: 700, behavior: "smooth" })
                return
            }
            if (addressOne === "" && addressOne === "") {
                resC.textContent = "Address is required"
                window.scrollTo({ top: 700, behavior: "smooth" })
                return
            }
            if (addressOne && !testOthers.test(addressOne)) {
                resC.textContent = "Invalid Address one"
                window.scrollTo({ top: 700, behavior: "smooth" })
                return
            }
            if (addressTwo && !testOthers.test(addressTwo)) {
                resC.textContent = "Invalid Address two"
                window.scrollTo({ top: 700, behavior: "smooth" })
                return
            }
            if (city === "") {
                resC.textContent = "City is required"
                window.scrollTo({ top: 700, behavior: "smooth" })
                return
            }
            if (!testOthers.test(city)) {
                resC.textContent = "Invalid city name"
                window.scrollTo({ top: 700, behavior: "smooth" })
                return
            }
            if (state === "") {
                resC.textContent = "state is required"
                window.scrollTo({ top: 700, behavior: "smooth" })
                return
            }
            if (!testOthers.test(state)) {
                resC.textContent = "Invalid state name"
                window.scrollTo({ top: 700, behavior: "smooth" })
                return
            }
            if (country === "") {
                resC.textContent = "country is required"
                window.scrollTo({ top: 700, behavior: "smooth" })
                return
            }
            if (!testOthers.test(country)) {
                resC.textContent = "Invalid country name"
                window.scrollTo({ top: 700, behavior: "smooth" })
                return
            }
            if (mobile === "") {
                resC.textContent = "Mobile os required"
                window.scrollTo({ top: 700, behavior: "smooth" })
                return
            }
            mobile = mobile.trim()
            if (isNaN(mobile) || mobile.length < 6 || mobile.length > 16) {
                resC.textContent = "Invalid mobile number"
                window.scrollTo({ top: 700, behavior: "smooth" })
                return
            }
            resC.textContent = ""
            location.href = "./payment.html"
        })
    }
    runMethod()
})