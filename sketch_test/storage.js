export function StoreChromeData(data) {

    chrome.storage.sync.set(data, function () {
        //  A data saved callback omg so fancy
        console.log('stored')
    });

}

StoreChromeData({ "key": "Prop" })