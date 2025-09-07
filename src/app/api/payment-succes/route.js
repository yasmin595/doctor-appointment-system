export async function POST(req) {
    const body = await req.formData();
    const val_id = body.get("val_id");

    const validationUrl = `${process.env.SSL_VALIDATION_API}?val_id=${val_id}&store_id=${process.env.SSL_STORE_ID}&store_passwd=${process.env.SSL_STORE_PASS}&v=1&format=json`;

    const response = await fetch(validationUrl);
    const data = await response.json();

    console.log("Validation Response:", data);

    return Response.redirect("http://localhost:3000/payment/success");
}
