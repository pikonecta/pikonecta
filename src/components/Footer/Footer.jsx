function Footer({ client, location, address, telephone }) {
  return (
    <div className="bg-sky-100 text-center text-gray-900">
      <h1>{client}</h1>
      <h1>{location}</h1>
      <h1>{address}</h1>
      <h1>{telephone}</h1>
    </div>
  );
}

export default Footer;
