const isTemplateUri = (uri) => {
  const regex = /[a-z0-9]{2,6}:\/\/[a-z0-9-_]+@[0-9\.]+#[0-9a-f]{64}/;

  return regex.test(uri);
}

export default isTemplateUri;
