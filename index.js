// Name: Rushin Parikh
// Could have created different files for all the classes defined below, but choose not to to make the structure simple!
// I have added commentes to the start and end of a section wit ****!

// ********* Start of const Links ************
const links = [
  {"name": "Linkedin", "url": "https://www.linkedin.com"}, 
	{"name": "Github", "url": "https://www.github.com" }, 
	{"name": "Carnegie Mellon University", "url": "https://www.cmu.edu"}
];


const socialLinks = [
  {"name": "Facebook", "url": "https://www.facebook.com", "svg": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/1024px-F_icon.svg.png" }, 
	{"name": "Google", "url": "https://www.google.com", "svg": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSsJLMmWgpJHxZKdGez-9XeEPlTuVdc6UGaTQ&usqp=CAU" }, 
	{"name": "Twitter", "url": "https://www.twitter.com", "svg": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPJtz0wr0H5miGyBNxIWVBLJv4TavbP0K8xA&usqp=CAU" }
];

// ********* End of constant Links ************

// ********* Start of HTML Writer Classes ************
class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  element(element) {
    const innerContent = this.links.reduce((acc, cur) => {
      const aTagString = `<a target = "_blank" rel="noreferrer" href="` + cur.url + `">` + cur.name + `</a>`;
      return acc + aTagString;
    }, "");
    element.setInnerContent(innerContent, { html: true });
  }
}
class AttributeRewriter {
  constructor(attribute, value) {
    this.attribute = attribute;
    this.value = value;
  }

  element(element) {
    element.setAttribute(this.attribute, this.value);
  }
}

class ContentRewriter {
  constructor(value) {
    this.value = value;
  }

  element(element) {
    element.setInnerContent(this.value);
  }
}

class SocialLinksTransformer {
  constructor(socialLinks) {
    this.socialLinks = socialLinks;
  }

  element(element) {
    let innerContent = this.socialLinks.reduce((acc, cur) => {
      const aTagString = `<a target = "_blank" rel="noreferrer" href="` + cur.url + `">` +   `<svg width="50" height="50"> <image width="50" height="50" href="` + cur.svg+  `" /> </svg>`  +
       `</a>`;
      return acc + aTagString;
    }, `<div id="social_links"> `);
    innerContent = innerContent + `</div>`
    element.setInnerContent(innerContent, { html: true });
  }
}

// ********* End of HTML Writer Classes ************

// ********* Start of Listners ************

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  if(request.url.endsWith("/links")) {
    return new Response(JSON.stringify(links), {
      headers: { 'content-type': 'application/json' },
    })
  }
  const resp = await fetch("https://static-links-page.signalnerve.workers.dev");
  return new HTMLRewriter().on("div#links", new LinksTransformer(links))
                           .on("div#profile", new AttributeRewriter("style", ""))
                           .on("img#avatar", new AttributeRewriter("src", "https://media-exp1.licdn.com/dms/image/C5103AQGkJg0lxppRgw/profile-displayphoto-shrink_400_400/0?e=1608768000&v=beta&t=9_5_FLBpCXnlWCHT6wOQg7_NckXttkF2XvRBZuFyFFA"))
                           .on("h1#name", new ContentRewriter("Rushin Parikh"))
                           .on("body", new AttributeRewriter("class", "bg-gray-600"))
                           .on("title", new ContentRewriter("Rushin Parikh"))
                           .on("div#social", new AttributeRewriter("style", ""))
                           .on("div#social", new SocialLinksTransformer(socialLinks)).transform(resp);

}

// ********* End of Listners ************
