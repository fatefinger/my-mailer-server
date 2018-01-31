/**
 * Created by 杨帆 on 2018/1/17.
 */
const Format = {
    /**
     * parse object Array into string eg: [{
     *                                          name: 'Alice',
     *                                          age: 15
     *                                      }, {                    => "{"name":"Alice","age":15}$${"name":"Bob","age":14}"
     *                                          name: 'Bob',
     *                                          age: 14
     *                                      }]
     * @param {Array}array
     * @return string
     */
    objectArrayToString(array) {
        try {
            let temp = array.map((item) => {
                return JSON.stringify(item)
            })
            return temp.join('$$')
        } catch (err) {
            throw new Error(err)
        }
    },
    /**
     * parse string into object Array eg:                                             [{
     *                                                                                    name: 'Alice',
     *                  "{"name":"Alice","age":15}$${"name":"Bob","age":14}"  =>        age: 15
     *                                                                                  }, {
     *                                                                                   name: 'Bob',
     * @param string                                                                     age: 14
     * @return {any[]}                                                                }]
     */
    stringToObjectArray(string) {
        console.log(typeof string)
        try {
            if (typeof string === 'string') {
                let temp = string.split('$$')
                return temp.map((item) => {
                    return JSON.parse(item)
                })
            }
        } catch (err) {
            console.log(`StringToObjectArray ERROR:${err}`)
            throw new Error(err)
        }
    }
}

module.exports = Format