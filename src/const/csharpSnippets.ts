export const csharpSnippets = [
  `int score = GetPlayerScore(player.id) ?? 0;`,
  `var items = inventory.Where(item => item.IsRare);`,
  `public event EventHandler<QuestEventArgs> QuestCompleted;`,
  `private readonly ILogger<GameEngine> _logger;`,
  `if (!quests.TryAdd(quest.Id, quest)) { throw; }`,
  `player.Position = new Vector2(0, 0);`,
  `const float AttackCooldown = 2.5f;`,
  `string name = GetPlayerName() ?? "Guest";`,
  `var topPlayers = players.OrderByDescending(p => p.Score);`,
  `sceneManager.LoadScene("Level_01_Forest");`,
  `public record PlayerState(int Health, int Mana);`,
  `transform.Rotate(0, 90 * Time.deltaTime, 0);`,
  `audioSource.PlayOneShot(explosionSound);`,
  `var activeEffects = status.Effects.Where(e => e.IsActive);`,
  `yield return new WaitForSeconds(spawnInterval);`,
];
