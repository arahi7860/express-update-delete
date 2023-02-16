async function getData() {
  const data = await fetch("");
  const json = await data.json();

  return json();
}

async function postData() {
  const data = await fetch("", {
    body: JSON.stringify({
      message: "Hello World!",
    }),
    method: "POST",
  });
  const json = await data.json();

  return json();
}
