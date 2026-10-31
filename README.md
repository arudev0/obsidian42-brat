# BRAT Forgejo

A fork of [BRAT](https://github.com/TfTHacker/obsidian42-brat) that also installs plugins from
[Forgejo](https://forgejo.org) (and should work with Gitea, which shares its API). GitHub repositories work as usual.

- **Add a Forgejo plugin** by its full URL, for example `https://forgejo.example.com/owner/plugin`.
- **Publish a Forgejo plugin** by committing the built `manifest.json`, `main.js` and optional `styles.css` to the root
  of the default branch. No releases are needed. Raise `version` in `manifest.json` to ship an update.
- **Private repositories** need a token with the `read:repository` scope, set under Forgejo in the plugin settings. It's
  kept apart from the GitHub token, so neither is ever sent to the other server.
- **Pinning a version** isn't available for Forgejo plugins, because only the latest root files exist.

It has its own plugin ID and `obsidian://brat-forgejo` links, so it can run next to the original BRAT.

The original BRAT documentation follows.

---

![](media/brat.jpg)

# BRAT - Beta Reviewers Auto-update Tester

This is a very special plugin designed to make life much easier for developers and beta-testers of plugins and themes.

The **Beta Reviewers Auto-update Tool** or **BRAT** for short is a plugin that makes it easier for you to assist other developers with reviewing and testing their plugins and themes.

Simply add the GitHub repository path for the beta Obsidian plugin to the list for testing and now you can just check for updates. Updates are downloaded and the plugin is reloaded. No more having to create folders, download files, copy them to the right place, and so on. This plugin takes care of all that for you.

Learn more about BRAT in the DOCUMENTATION found at: https://tfthacker.com/BRAT or follow me at https://twitter.com/tfthacker for updates.

You might also be interested in a few products I have made for Obsidian:

- [JournalCraft](https://tfthacker.com/jco) - A curated collection of 10 powerful journaling templates designed to enhance your journaling experience. Whether new to journaling or looking to step up your game, JournalCraft has something for you.
- [Cornell Notes Learning Vault](https://tfthacker.com/cornell-notes) - This vault teaches you how to use the Cornell Note-Taking System in your Obsidian vault. It includes learning material, samples, and Obsidian configuration files to enable Cornell Notes in your vault.
