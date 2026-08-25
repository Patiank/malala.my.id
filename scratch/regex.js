const html = `<link rel="canonical" href="url">
<link rel="preconnect" href="...">
<link href="fonts" rel="stylesheet">
<link rel="stylesheet" href="leaflet.css" />`;
console.log(html.replace(/<link rel="canonical".*?\/>/is, 'REPLACED'));
