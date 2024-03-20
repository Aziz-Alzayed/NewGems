﻿using System.Text.Json.Serialization;

namespace NG.DataCore.Models.JwtModels
{
    public class JwtTokenConfigModel
    {
        [JsonPropertyName("aecretKey")]
        public string SecretKey { get; set; }

        [JsonPropertyName("issuer")]
        public string Issuer { get; set; }

        [JsonPropertyName("audience")]
        public string Audience { get; set; }

        [JsonPropertyName("accessTokenExpirationDays")]
        public int AccessTokenExpirationDays { get; set; }

        [JsonPropertyName("refreshTokenExpirationDays")]
        public int RefreshTokenExpirationDays { get; set; }
    }
}
