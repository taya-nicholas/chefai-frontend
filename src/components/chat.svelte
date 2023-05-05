<script lang="ts">
  import { onMount } from "svelte";

  export let recipe: any;
  let inputMessage = "";
  let assistantTyping = "";
  let isLoading = false;
  let messages: any[] = [
    {
      role: "assistant",
      content: `Hello! How can I assist you with this ${recipe.name}?`,
    },
  ];
  let messagesContainer: any = null;

  onMount(() => {
    messagesContainer = document.querySelector(".messages");
  });

  async function sendMessage() {
    if (!inputMessage.trim()) return;
    const userMessage = {
      role: "user",
      content: inputMessage,
    };

    messages = [...messages, userMessage];
    inputMessage = "";

    isLoading = true;
    scrollToBottom();

    const response: any = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
        recipe: recipe,
      }),
    });

    if (response.ok) {
      isLoading = false;
      const data = await response.json();
      const reply = data.reply.content;
      let currentText = "";

      const typingDelay = 15;

      for (const character of reply) {
        currentText += character;
        assistantTyping = currentText;
        await new Promise((resolve) => setTimeout(resolve, typingDelay));
        scrollToBottom();
      }
      messages = [...messages, { role: "assistant", content: reply }];
      assistantTyping = "";
    } else {
      console.error("Failed to fetch ChatGPT response");
    }
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
</script>

<div class="chat-container border border-1 rounded-lg border-slate-600">
  <div class="messages" bind:this={messagesContainer}>
    {#each messages as message, index (message.content + message.sender + index)}
      <div class={`message ${message.role}`}>
        <span class="">{message.content}</span>
      </div>
    {/each}
    {#if isLoading}
      <div class="message assistant">
        <div class="loading-spinner" />
      </div>
    {/if}
    {#if assistantTyping}
      <div class="message assistant">
        <span>{assistantTyping}</span>
      </div>
    {/if}
  </div>

  <div class="input-container text-black">
    <input
      type="text"
      bind:value={inputMessage}
      placeholder="Type your question..."
      on:keydown={(e) => e.key === "Enter" && sendMessage()}
    />
    <button class="btn bg-aqua" on:click={sendMessage}>Send</button>
  </div>
</div>

<style>
  .chat-container {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    height: 80vh;
    margin: 0 auto;
    overflow: hidden;
  }

  .messages {
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;
  }

  .message {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .message span {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 12px;
    max-width: 80%;
    word-wrap: break-word;
  }

  .message.user {
    justify-content: flex-end;
  }

  .message.assistant {
    justify-content: flex-start;
  }

  .message.user span {
    background-color: #0084ff;
    color: #fff;
  }

  .message.assistant span {
    background-color: #f1f0f0;
    color: #222;
  }

  .input-container {
    display: flex;
    padding: 1rem;
    border-top: 1px solid #ccc;
    background-color: #f1f0f0;
  }

  .input-container input {
    flex-grow: 1;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
  }

  .input-container button {
    margin-left: 1rem;
    padding: 8px 12px;
    background-color: #0084ff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .loading-spinner {
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 3px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    border-top-color: #0084ff;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
