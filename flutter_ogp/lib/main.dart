import 'package:cloudflare_workers/cloudflare_workers.dart' hide File;
import 'package:dart_firebase_admin/dart_firebase_admin.dart';
import 'package:dart_firebase_admin/firestore.dart';
import 'package:edge_http_client/edge_http_client.dart';
import 'package:http/http.dart' as http;

const clientId = "11****+++++++*";
const privateKey = "-----BEGIN PRIVATE KEY-----\nMII********";
const clientEmail = "******@template-dev-d032e.iam.gserviceaccount.com";

void main() {
  CloudflareWorkers(fetch: (request, env, ctx) async {
    return http.runWithClient(() async {
      final admin = FirebaseAdminApp.initializeApp(
          'template-dev-d032e',
          Credential.fromServiceAccountParams(
            clientId: clientId,
            privateKey: privateKey,
            clientEmail: clientEmail,
          ));
      final firestore = Firestore(admin);
      final collection = firestore.collection('test');
      final snapshot = await collection.get();
      final data = <Map<String, Object?>>[];
      for (final doc in snapshot.docs) {
        data.add(doc.data());
      }
      final str = data.last.toString();

      final noneOgpRes =
          await fetch(Resource('https://flutter-web-cloudflare-ogp.web.app/'));
      final siteUrl = noneOgpRes.url.toString();

      return HTMLRewriter()
          .on(
              "head",
              OGPElementHandler(
                siteName: 'flutter-web-cloudflare-ogp',
                // fluter側で設定したtitleが反映されるけど、クローニング等のためにここでも設定しておく
                title: 'Ogp Example | flutter-web-cloudflare-ogp',
                siteUrl: siteUrl,
                description: 'flutter-web-cloudflare-ogp description',
                image:
                    'https://ogp-worker-vercel-og.akaboshinit.workers.dev/ogp?title=$str',
                imageAlt: 'cat image',
              ))
          .transform(noneOgpRes);
    }, () => EdgeHttpClient());
  });
}

class OGPElementHandler extends ElementHandler {
  OGPElementHandler({
    required this.title,
    required this.description,
    required this.siteName,
    required this.siteUrl,
    required this.image,
    required this.imageAlt,
  });

  final String title;
  final String description;
  final String siteName;
  final String siteUrl;
  final String image;
  final String imageAlt;

  @override
  FutureOr<void> element(Element element) {
    element.before("""
<title>$title</title>
<meta name="description" content="$description" />
<meta property="og:title" content="$title" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="$siteName" />
<meta property="og:description" content="$description" />
<meta property="og:url" content="$siteUrl" />
<meta property="og:image" content="$image" />
<meta property="og:image:alt" content="$imageAlt" />
<meta property="twitter:title" content="$title" />
<meta property="twitter:description" content="$description" />
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:image:src" content="$image" />
""", ContentOptions(html: true));
  }
}
