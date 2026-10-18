import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privox Privacy Policy",
  description:
    "How Privox, the app lock for Android by Ovelo, handles your data: everything stays on your device, with no account, servers or analytics.",
  path: "/privacy/privox",
});

// Written against Privox v1.1.0 (package ai.ovelo.privox). Re-check against the app's
// manifest, permissions and stored data before every release, and update the date below.
const lastUpdated = "18 October 2026";

const sections: LegalSection[] = [
  {
    id: "summary",
    heading: "Summary",
    body: (
      <>
        <p>
          Privox is an app lock for Android made by Ovelo. It lets you protect the apps you choose with a PIN or your
          device’s biometrics.
        </p>
        <ul>
          <li>Everything Privox does happens on your device.</li>
          <li>There is no account, no server and no cloud service run by us.</li>
          <li>Privox contains no analytics, advertising or tracking tools.</li>
          <li>The released app does not request internet access, so it cannot send data anywhere itself.</li>
          <li>We (Ovelo) do not collect, receive, sell or share any of your data.</li>
        </ul>
      </>
    ),
  },
  {
    id: "stored-on-device",
    heading: "Information stored on your device",
    body: (
      <>
        <p>To work, Privox keeps the following in its private storage on your phone. Other apps cannot read it.</p>
        <ul>
          <li>
            <strong>Your PIN — in protected form only.</strong> Privox never stores your PIN itself. It stores a salted,
            one-way hash of it (PBKDF2-SHA256), further protected with a key held in your device’s Android Keystore that
            cannot be exported.
          </li>
          <li>
            <strong>The apps you choose to lock</strong>, identified by their package names.
          </li>
          <li>
            <strong>Your settings</strong>, such as whether protection and biometrics are on, the relock timing, the
            shuffled-keypad option and new-app suggestions.
          </li>
          <li>
            <strong>Activity history</strong>: for each unlock or wrong-PIN attempt on a protected app, the time, the app
            and whether a PIN or biometrics was used. Only the latest 300 events are kept, and you can clear them at any
            time from the Activity screen.
          </li>
          <li>
            <strong>Wrong-PIN attempt count</strong> and any lockout time, used to slow down guessing.
          </li>
          <li>
            <strong>App icons</strong> of your installed apps, cached so the app list loads quickly.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "permissions",
    heading: "Permissions and why Privox needs them",
    body: (
      <>
        <ul>
          <li>
            <strong>Usage access</strong> — lets Privox see which app is currently on screen, so it can show the lock
            screen when you open a protected app. This is checked on the device and is not recorded, apart from the
            activity history described above.
          </li>
          <li>
            <strong>Display over other apps</strong> — allows the lock screen to appear on top of a protected app while
            Privox is running in the background.
          </li>
          <li>
            <strong>Foreground service</strong> — keeps protection running in the background, with an ongoing
            notification.
          </li>
          <li>
            <strong>Notifications</strong> (optional) — shows the “protection is on” notification and offers to lock
            newly installed apps.
          </li>
          <li>
            <strong>Run at startup</strong> — restarts protection after your phone reboots or Privox is updated, if
            protection was on.
          </li>
          <li>
            <strong>Biometrics</strong> — lets you unlock with your fingerprint or face.
          </li>
          <li>
            <strong>Vibration</strong> — gives haptic feedback on the keypad.
          </li>
        </ul>
        <p>
          To show the list of apps you can lock, Privox reads the apps that appear in your launcher. Lock suggestions
          (for example, chat or banking apps) are worked out on the device and are never uploaded.
        </p>
        <p>
          Privox does not use accessibility services, device administrator access, storage, camera, microphone,
          location, contacts or network permissions.
        </p>
      </>
    ),
  },
  {
    id: "biometrics",
    heading: "Biometrics",
    body: (
      <p>
        Fingerprint and face unlock are handled entirely by Android. Privox only receives a “success” or “failed”
        result. It never receives, stores or has access to your fingerprint, face data or any other biometric
        information.
      </p>
    ),
  },
  {
    id: "backups",
    heading: "Device backups",
    body: (
      <>
        <p>
          The current version of Privox allows Android’s built-in backup. If you have turned on backup in your phone’s
          settings, Android may include Privox’s settings, locked-app list and activity history in your device backup,
          which Google stores in your Google account. That backup is made by Android, not by Privox, and is covered by{" "}
          <a href="https://policies.google.com/privacy">Google’s Privacy Policy</a>. We never receive or have access to
          it.
        </p>
        <p>
          A backup cannot be used to reveal or reuse your PIN, because verifying it depends on a key that never leaves
          your original device’s Android Keystore. If you do not want Privox data included, you can turn off backup in
          your phone’s settings.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "Data sharing",
    body: (
      <p>
        We do not collect your data, so we have nothing to share, sell or transfer. Privox includes no third-party
        analytics, advertising, crash-reporting or tracking software.
      </p>
    ),
  },
  {
    id: "retention",
    heading: "Keeping and deleting your data",
    body: (
      <ul>
        <li>Data stays on your device until you remove it.</li>
        <li>You can clear the activity history at any time from the Activity screen in Privox.</li>
        <li>Uninstalling Privox, or clearing its storage in Android settings, deletes all of its data from your device.</li>
      </ul>
    ),
  },
  {
    id: "security",
    heading: "Security and limitations",
    body: (
      <>
        <p>
          Privox protects your PIN as described above, blocks screenshots of its lock screen, and adds increasing
          lockouts after repeated wrong PINs. Like other Android app locks, it also has limits:
        </p>
        <ul>
          <li>A protected app may be visible for a brief moment before the lock screen covers it.</li>
          <li>Notifications and recent-apps previews from protected apps are not hidden.</li>
          <li>
            Anyone who can unlock your phone can change Privox’s permissions or uninstall it. Privox adds privacy; it is
            not a replacement for your phone’s own screen lock.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "google-play",
    heading: "Downloading from Google Play",
    body: (
      <p>
        If you install Privox from Google Play, Google may collect information about the download and your device under{" "}
        <a href="https://policies.google.com/privacy">its own Privacy Policy</a>. We do not receive personal information
        about you from this.
      </p>
    ),
  },
  {
    id: "children",
    heading: "Children",
    body: (
      <p>
        Privox is not directed at children under 13. Privox does not collect personal information from anyone,
        including children.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        If a future version of Privox changes how data is handled, we will update this policy before that version is
        released and change the “Last updated” date above.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact",
    body: (
      <p>
        Questions about this policy or about Privox? Email <a href={`mailto:${site.email}`}>{site.email}</a> or use our{" "}
        <Link href="/contact?reason=support">contact page</Link>. Please don’t send your PIN or other sensitive
        information.
      </p>
    ),
  },
];

export default function PrivoxPrivacyPage() {
  return (
    <LegalPage
      title="Privox Privacy Policy"
      intro="Privox is an app lock for Android by Ovelo. Your data stays on your device: no account, no servers, no analytics."
      updated={lastUpdated}
      sections={sections}
    />
  );
}
