import {test,expect,request} from '@playwright/test';
const loginPayLoad={userEmail: "rafi.tgcs219@gmail.com", userPassword: "MBxanptFWYri5$k"};
const createOrderPayLoad={orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakePayLoad={"data":[],"message":"No Orders"};
let token:any;
let orderid:any;
test.beforeAll( async ()=>{

    //login API
    const apiContext=await request.newContext();
    const apiRes=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayLoad});
    const apiResJson=await apiRes.json();
    token=await apiResJson.token;
    console.log(token);

    //create order API
    const apiContext2=await request.newContext();
    const apiRes2=await apiContext2.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data:createOrderPayLoad,
        headers:{
            authorization:token,
            'Content-Type':'application/json',
        }
    });
    const apiResJson2=await apiRes2.json();
    const orderid = await apiResJson2.orders[0];
    console.log(orderid);

});

test("API Testing", async ({page})=>{

   await page.addInitScript(value =>{

    window.localStorage.setItem("token",value)
   },token);

   await page.goto("https://rahulshettyacademy.com/client");
   await expect(page).toHaveTitle("Let's Shop");
   //await page.locator("text='  ORDERS'").click();

   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",async route=>{

    const response=await page.request.fetch(route.request());
    const body = JSON.stringify(fakePayLoad);

    await route.fulfill({

        response,
       // body
    });
   })
   await page.locator("text='  ORDERS'").click();
   await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
   await page.pause();

});