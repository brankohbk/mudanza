import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
    const products = ref([])

    const fetchProducts = async () => {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRUGWBTm8_huwf6REr_eaNLVIm-5GdStd_2W4jNVmuyhePZhmv4BXRUaqdcH8QJBqdwpl6huXhCvAhV/pub?gid=0&single=true&output=tsv')
        const responseToText = await response.text()
        // console.log(responseToText)
        const responseToArray = responseToText.split('\n').map((line) => line.split('\t'))

        const headers = responseToArray[0]
        products.value = responseToArray.slice(1).map((product) => {
            const productObject = {}
            headers.forEach((header, index) => {
                productObject[header] = product[index]
            })
            return productObject
        })
    }

    // fetchProducts()
    // console.log(products.value)

    return { products, fetchProducts }
})