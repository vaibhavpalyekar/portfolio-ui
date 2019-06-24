const baseURL = process.env.REACT_APP_API_URL;
export function callApi(api, method, data) {

    var apiBaseURL = baseURL + api + '/';

    return new Promise((resolve, reject) => {


        var settings = {
            method: method
        };

        if (method === "POST") {
            settings.body = JSON.stringify(data);
        } else {
            var params = Object.keys(data).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
            }).join('&');
            apiBaseURL += '?' + params;
        }
        fetch(apiBaseURL, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                resolve(response.statusText);

            })
            .then((res) => {

                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });

    });

}