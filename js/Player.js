export class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 32
    this.height = 40
    this.velocityX = 0
    this.velocityY = 0
    this.speed = 3
    this.jumpPower = 10
    this.isOnGround = false
    this.lives = 3
    this.invulnerable = false
    this.invulnerabilityTime = 0
  }

  update(keys) {
    // Horizontal movement
    this.velocityX = 0
    if (keys.left) {
      this.velocityX = -this.speed
    }
    if (keys.right) {
      this.velocityX = this.speed
    }

    // Jump
    if (keys.up && this.isOnGround) {
      this.velocityY = -this.jumpPower
      this.isOnGround = false
    }

    // Apply velocity
    this.x += this.velocityX
    this.y += this.velocityY

    // Update invulnerability
    if (this.invulnerable) {
      this.invulnerabilityTime--
      if (this.invulnerabilityTime <= 0) {
        this.invulnerable = false
      }
    }
  }

  takeDamage() {
    if (!this.invulnerable) {
      this.lives--
      this.invulnerable = true
      this.invulnerabilityTime = 60 // 1 second at 60 FPS
    }
  }

  draw(ctx) {
    if (this.invulnerable && Math.floor(this.invulnerabilityTime / 10) % 2 === 0) {
      return // Flashing effect
    }

    // Body
    ctx.fillStyle = "#667eea"
    ctx.fillRect(this.x, this.y + 10, this.width, this.height - 10)

    // Head
    ctx.fillStyle = "#764ba2"
    ctx.beginPath()
    ctx.arc(this.x + this.width / 2, this.y + 10, 10, 0, Math.PI * 2)
    ctx.fill()

    // Eyes
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(this.x + 10, this.y + 7, 4, 4)
    ctx.fillRect(this.x + 18, this.y + 7, 4, 4)
  }
}
